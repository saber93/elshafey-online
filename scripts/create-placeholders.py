"""Generate the six replaceable portrait placeholders used by the website."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "images"
WIDTH, HEIGHT = 800, 1000

MEMBERS = [
    ("sheikh-saber-el-shafey.jpg", "SS", "01"),
    ("samir-el-shafey.jpg", "SE", "02"),
    ("faraj-el-shafey.jpg", "FE", "03"),
    ("wesam-el-shafey.jpg", "WE", "04"),
    ("saber-el-shafey.jpg", "SE", "05"),
    ("farid-el-shafey.jpg", "FE", "06"),
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)
    return ImageFont.load_default()


def mix(start: tuple[int, int, int], end: tuple[int, int, int], amount: float) -> tuple[int, int, int]:
    return tuple(round(a + (b - a) * amount) for a, b in zip(start, end))


def draw_placeholder(filename: str, initials: str, number: str, offset: int) -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), "#0b1f33")
    pixels = image.load()
    top = (18 + offset, 48 + offset, 77 + offset)
    bottom = (7, 23, 37)
    for y in range(HEIGHT):
        color = mix(top, bottom, y / (HEIGHT - 1))
        for x in range(WIDTH):
            pixels[x, y] = color

    draw = ImageDraw.Draw(image, "RGBA")
    gold = (219, 182, 111, 255)
    ivory = (247, 243, 234, 255)

    for radius, alpha in [(290, 24), (225, 36), (160, 52)]:
        box = (
            WIDTH // 2 - radius,
            HEIGHT // 2 - radius,
            WIDTH // 2 + radius,
            HEIGHT // 2 + radius,
        )
        draw.ellipse(box, outline=(219, 182, 111, alpha), width=2)

    draw.ellipse((520, 70, 890, 440), fill=(219, 182, 111, 14))
    draw.ellipse((-220, 720, 270, 1210), fill=(199, 154, 75, 12))

    for x in range(40, WIDTH, 80):
        draw.line((x, 0, x, HEIGHT), fill=(247, 243, 234, 7), width=1)
    for y in range(40, HEIGHT, 80):
        draw.line((0, y, WIDTH, y), fill=(247, 243, 234, 7), width=1)

    initials_font = font(156, bold=True)
    initials_box = draw.textbbox((0, 0), initials, font=initials_font)
    initials_width = initials_box[2] - initials_box[0]
    initials_height = initials_box[3] - initials_box[1]
    draw.text(
        ((WIDTH - initials_width) / 2, (HEIGHT - initials_height) / 2 - 42),
        initials,
        font=initials_font,
        fill=gold,
    )

    label_font = font(18, bold=True)
    draw.text((54, 56), "EL SHAFEY FAMILY", font=label_font, fill=(247, 243, 234, 150))

    number_font = font(22, bold=True)
    number_box = draw.textbbox((0, 0), number, font=number_font)
    number_width = number_box[2] - number_box[0]
    draw.rounded_rectangle((680, 42, 758, 99), radius=28, outline=(219, 182, 111, 100), width=2)
    draw.text((719 - number_width / 2, 59), number, font=number_font, fill=ivory)

    small_font = font(14, bold=True)
    draw.line((54, 917, 151, 917), fill=(219, 182, 111, 170), width=2)
    draw.text((54, 936), "PORTRAIT PLACEHOLDER", font=small_font, fill=(247, 243, 234, 125))

    image.save(OUTPUT / filename, "JPEG", quality=91, optimize=True, progressive=True)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for index, member in enumerate(MEMBERS):
        draw_placeholder(*member, offset=index * 2)


if __name__ == "__main__":
    main()
