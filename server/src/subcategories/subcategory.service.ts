import prismaClient from "../prismaClient";

const getSubcategoryIDByTitle = async (subcategoryTitle: string) => {
  const subcategory_id = await prismaClient.subcategories.findFirst({
    where: {
      title: subcategoryTitle
        ? subcategoryTitle[0].toUpperCase() + subcategoryTitle.slice(1)
        : "",
    },
    select: { id: true },
  });

  return subcategory_id;
};

export default { getSubcategoryIDByTitle };
