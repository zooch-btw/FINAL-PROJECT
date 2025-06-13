# This script generates the "products.txt" file with properly formatted product data
# for Little Bird Toys' shopping/cart system. It matches the DOM structure used in JavaScript.

# Format of each product in products.txt:
# name@price@details@rating@reviews@images@related^
# Where:
# - name: Product name (string)
# - price: Product price (string, e.g., "$13.99")
# - details: Three parts separated by "/" (e.g., "description/features/notes")
# - rating: Overall rating placeholder (string, currently "rating")
# - reviews: Individual reviews separated by "/", each starting with a rating number followed by text (e.g., "4  Great product")
# - images: Image file paths separated by "&" (e.g., "imgs/car1.jpg&imgs/car2.jpg")
# - related: Related items placeholder separated by "/" (e.g., "related/related")
# - Each product ends with "^" as a delimiter

products = [
    {
        "name": "Toy Car",
        "price": "$13.99",
        "details": "This heirloom-quality wooden car is a timeless treasure./Handcrafted from domestic and exotic hardwoods with a clear lacquer finish, this unique car will inspire generations of imaginative play./Please note potential choking hazards for small children.",
        "rating": "rating",
        "reviews": "4  Fantastic gift, definitely recommend./3  Awesome quality.",
        "images": "imgs/car1.jpg&imgs/car2.jpg&imgs/car3.jpg",
        "related": "related/related"
    },
    {
        "name": "Toy Boat",
        "price": "$14.99",
        "details": "Set sail for bathtub adventures with this adorable wooden boat!/Made from solid Maine white pine, this handcrafted toy floats and features rounded edges for safety. Includes two peg \"lobster people.\"/Size: 10.5\"W x 3.5\"H",
        "rating": "rating",
        "reviews": "4  review/3  Great, but overpriced! / 5  Loved it, the \"lobster people\" cracked me up",
        "images": "imgs/boat1.jpg&imgs/boat2.jpg",
        "related": "related/related"
    },
    {
        "name": "Building Blocks",
        "price": "$49.98",
        "details": "Build creativity and imagination with this high-quality, 72-piece block set./Made from naturally finished and smooth-sanded hardwood blocks, this set comes in a convenient wooden storage crate (13” L x 12” W x 2” H)./",
        "rating": "rating",
        "reviews": "2  Rough edges, sent back./3  Good concept, but the blocks fell on me and hurt my foot./ 5  Great set, arrived on time!",
        "images": "imgs/block2.jpg&imgs/block1.jpg&imgs/block5.jpg",
        "related": "related/related"
    },
    {
        "name": "Toy Train",
        "price": "$26.99",
        "details": "Embark on a charming journey with this beautiful handcrafted wooden train set./Engine and three interchangeable cars boast intricate details made from real beech wood./Large size (84cm L x 11cm H x 13cm W) with moving wheels and a fully ecological design.",
        "rating": "rating",  # Corrected from "RATING" for consistency
        "reviews": "2  Came missing cars. Sent back./5  Stupendous, got this as a Christmas gift for my son.",
        "images": "imgs/train1.jpg&imgs/train2.jpg&imgs/train3.jpg",
        "related": "related/related"
    },
    {
        "name": "Toy Plane",
        "price": "$16.99",
        "details": "Soar through imaginative skies with this classic wooden airplane./Handcrafted from sustainable Baltic birch wood with a safe, natural harvest finish and a spinning propeller./Measures 3.5\"H x 7\"L x 7\"W.",
        "rating": "rating",
        "reviews": "4  Propeller came unattached./1  No batteries, very disappointed.",
        "images": "imgs/plane3.jpg&imgs/plane2.jpg&imgs/plane1.jpg",
        "related": "related/related"
    }
]

# Write the formatted data to products.txt using UTF-8 encoding
# "w" mode overwrites the file if it exists, ensuring a fresh output
with open("products.txt", "w", encoding="utf-8") as file:
    for product in products:
        # Join product attributes with "@" and append "^" as the product delimiter
        line = "@".join([
            product["name"],
            product["price"],
            product["details"],
            product["rating"],
            product["reviews"],
            product["images"],
            product["related"]
        ])
        file.write(line + "^")

# Confirmation message
print("products.txt has been generated successfully.")