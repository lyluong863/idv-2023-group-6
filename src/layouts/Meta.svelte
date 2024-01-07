<script>
  export let title = "Global Human Day - IDV - Group 6";
  export let description =
    "A new study calculated the average “global human day,” revealing which activities take up most of our time";
  export let keywords = "global, idv, human, data";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content="Ly Luong" />
  <meta name="news_keywords" content={keywords} />

  <meta property="og:title" content={title} />
  <meta
    property="og:site_name"
    content="Global Human Day - IDV 2023 - KU Leuven"
  />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="en_US" />

  <meta name="robots" content="max-image-preview:large" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;600;700;900&family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
</svelte:head>
