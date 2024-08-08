import prismaClient from "../prismaClient";

async function getCategoryIDByTitle(categoriesTitles: string) {
  const category_id = await prismaClient.categories.findFirst({
    where: {
      title: categoriesTitles
        ? categoriesTitles[0].toUpperCase() + categoriesTitles.slice(1)
        : "",
    },
    select: { id: true },
  });

  return category_id;
}

export default { getCategoriesIDByTitle: getCategoryIDByTitle };
