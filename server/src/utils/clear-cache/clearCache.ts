interface TagItem {
    addresses: "addresses";
    brands: "brands";
    cart: "cart";
    credentials: "credentials";
    customers: "customers";
    media: "media";
    orders: "orders";
    products: "products";
    reviews: "reviews";
    subcategories: "subcategories";
    wishlists: "wishlists";
    categories: "categories";
}

export default async function clearCache(tag: keyof TagItem) {
    const res = await fetch("http://localhost:3000/api/revalidate", {
        method: "POST",
        headers: {
            Authorization: "cache-secret-key",
        },
        body: JSON.stringify({ tag: tag }),
    });
    if (res.status !== 200) {
        throw new Error(await res.json().then((val) => val.message));
    }
}
