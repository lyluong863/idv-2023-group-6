<script>
  import { Graphic } from "@snlab/florence";
  import { getContext } from "svelte";

  import { getCategoriesData } from "data/categories"


  const { all_categories } = getContext("data");

  console.log(getCategoriesData(all_categories, "Food provision"))
</script>

<Graphic width={600} height={800} backgroundColor={"#f2f2f2"}></Graphic>
