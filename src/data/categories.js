export function getCategoriesData(allCategories, categoriesName) {
  return allCategories
    .row({ key: categoriesName })
    .$grouped.groupBy("country_iso3")
    .summarise({
      totalHours: { hoursPerDayCombined: "sum" },
      population: { population: "max" },
    });
}

export const categories = [
  {
    name: "Food provision",
    subCategories: [
      "Food growth & collection",
      "Food processing",
      "Food preparation",
    ],
  },
  {
    name: "Nonfood provision",
    subCategories: ["Materials", "Energy"],
  },
  {
    name: "Technosphere modification",
    subCategories: ["Buildings", "Infrastructure", "Artifacts"],
  },
  {
    name: "Maintenance of surroundings",
    subCategories: ["Inhabited environment", "Waste management"],
  },
  {
    name: "Somatic maintenance",
    subCategories: [
      "Hygiene & grooming",
      "Physical child care",
      "Health care",
      "Sleep & bedrest",
    ],
  },
  {
    name: "Deliberate neural restructuring",
    subCategories: ["Schooling & research", "Religious practice"],
  },
  {
    name: "Organization",
    subCategories: [
      "Material transportation",
      "Human transportation",
      "Allocation",
    ],
  },
  {
    name: "Experience oriented",
    subCategories: [
      "Meals",
      "Active recreation",
      "Interactive",
      "Passive",
      "Social",
    ],
  },
];
