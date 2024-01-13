<script>
  import { Graphic } from "@snlab/florence";
  import { getContext } from "svelte";

  import { getCategoriesData } from "data/categories";

  const { all_categories, all_gdp } = getContext("data");

  console.log(getCategoriesData(all_categories, "Food provision", all_gdp));
</script>

<Graphic width={600} height={800} backgroundColor={"#f2f2f2"}></Graphic>
