import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  familyRegistry,
  routeRegistry,
  SITE_URL,
  structuredDataFor,
} from "../app/family-registry.ts";

const expectedMembers = [
  ["Sheikh Saber El Shafey", "الشيخ صابر الشافعي", "Religious service", "الخدمة الدينية"],
  ["Samir El Shafey", "سمير الشافعي", "Textiles", "النسيج"],
  ["Faraj El Shafey", "فرج الشافعي", "Law", "القانون"],
  ["Wesam El Shafey", "وسام الشافعي", "HVAC", "التدفئة والتهوية وتكييف الهواء"],
  ["Saber El Shafey", "صابر الشافعي", "UX", "تجربة المستخدم"],
  ["Farid El Shafey", "فريد الشافعي", "Digital marketing", "التسويق الرقمي"],
];

test("the typed route registry owns exactly the two sitemap URLs", () => {
  assert.equal(routeRegistry.length, 2);
  assert.deepEqual(
    routeRegistry.map((route) => route.path),
    ["/en", "/ar"],
  );
  assert.deepEqual(
    routeRegistry.map((route) => route.canonical),
    ["https://elshafey.online/en", "https://elshafey.online/ar"],
  );

  for (const route of routeRegistry) {
    assert.equal(route.ownerStatus, "canonical-owner");
    assert.equal(route.indexable, true);
    assert.equal(route.canonical, `${SITE_URL}${route.path}`);
    assert.equal(route.localizedCounterpart, route.locale === "en" ? "/ar" : "/en");
    assert.deepEqual(route.schemaEligibility, [
      "WebSite",
      "CollectionPage",
      "ItemList",
      "Person",
    ]);
    assert.ok(route.evidenceReferences.length >= 2);
  }
});

test("the registry preserves order while limiting members to approved names and broad fields", () => {
  assert.equal(familyRegistry.members.length, 6);
  assert.deepEqual(
    familyRegistry.members.map((member) => [
      member.name.en,
      member.name.ar,
      member.field.en,
      member.field.ar,
    ]),
    expectedMembers,
  );

  const portraits = familyRegistry.members.filter((member) => "portrait" in member);
  assert.deepEqual(
    portraits.map((member) => [member.id, member.portrait.src]),
    [
      ["wesam", "/images/wesam-el-shafey-471fa8f5.avif"],
      ["saber", "/images/saber-el-shafey-d4245955.avif"],
    ],
  );
  assert.equal(familyRegistry.members[3].website, "https://wesam.elshafey.online");
  assert.equal(familyRegistry.members[4].website, "https://saber.elshafey.online");
});

test("schema is limited to WebSite, CollectionPage, ItemList and approved Person facts", () => {
  for (const language of ["en", "ar"]) {
    const schema = structuredDataFor(language);
    assert.deepEqual(
      schema["@graph"].map((node) => node["@type"]),
      ["WebSite", "CollectionPage", "ItemList"],
    );

    const itemList = schema["@graph"][2];
    assert.equal(itemList.numberOfItems, 6);
    assert.equal(itemList.itemListElement.length, 6);

    const people = itemList.itemListElement.map((entry) => entry.item);
    for (const [index, person] of people.entries()) {
      assert.ok(
        Object.keys(person).every((key) =>
          ["@type", "name", "description", "image", "url"].includes(key),
        ),
      );
      assert.equal(person.name, expectedMembers[index][language === "en" ? 0 : 1]);
      assert.equal(person.description, expectedMembers[index][language === "en" ? 2 : 3]);
      assert.equal("image" in person, index === 3 || index === 4);
      assert.equal("url" in person, index === 3 || index === 4);
      if (index === 3) assert.equal(person.url, "https://wesam.elshafey.online");
      if (index === 4) assert.equal(person.url, "https://saber.elshafey.online");
    }
  }
});

test("the protected Sites hosting record is byte-for-byte unchanged", async () => {
  const bytes = await readFile(new URL("../.openai/hosting.json", import.meta.url));
  const digest = createHash("sha256").update(bytes).digest("hex");
  assert.equal(
    digest,
    "7c9986bc7797c72ee1b42fb0fe22194672621d0379efab776224e7edeb634083",
  );
});
