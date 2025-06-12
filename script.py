# This script generates the "products.txt" file with sample product data
# for the Little Bird Toys product page, compatible with the provided JavaScript code.

# Define a list of sample products as dictionaries
# Each product includes name, price, details, rating, reviews, images, and related products
products = [
    {
        "name": "Wooden Car",
        "price": "19.99",
        "details": "Handcrafted/Made in USA/Durable",
        "rating": "0",  # Initial rating; JavaScript will recalculate based on reviews
        "reviews": "5  Amazing toy!/4  Good but a bit pricey",
        "images": "imgs/car1.jpg&imgs/car2.jpg&imgs/car3.jpg",
        "related": "Wooden Truck/Wooden Plane"
    },
    {
        "name": "Wooden Truck",
        "price": "24.99",
        "details": "Large/Handcrafted/Eco-friendly",
        "rating": "0",
        "reviews": "4.5  Love it!/3  Too big for small kids",
        "images": "imgs/truck1.jpg&imgs/truck2.jpg",
        "related": "Wooden Car/Wooden Plane"
    },
    {
        "name": "Wooden Plane",
        "price": "22.50",
        "details": "Smooth finish/Lightweight/Safe for kids",
        "rating": "0",
        "reviews": "5  Perfect for my child!/4.5  Well made",
        "images": "imgs/plane1.jpg&imgs/plane2.jpg&imgs/plane3.jpg&imgs/plane4.jpg",
        "related": "Wooden Car/Wooden Truck"
    }
]

# Open "products.txt" in write mode to store the product data
with open("products.txt", "w") as file:
    for product in products:
        # Join product fields with "@" as per the JavaScript's expected format
        # Fields: name@price@details@rating@reviews@images@related
        line = "@".join(product.values())
        # Write the line to the file, followed by "^" to separate products
        file.write(line + "^")

# Confirmation message to indicate successful file generation
print("products.txt has been generated successfully.")