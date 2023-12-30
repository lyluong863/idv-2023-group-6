# PROJECT DESCRIPTION

# Author
- Ly Luong (r0967247)

# Project structure
- src/components: shared components across pages
- src/layouts: layout setup for the website
- src/data: pre-processed data from the dataset
- src/pages: pages in the website
- src/routes: config route for svelte kit, we only have one route for this project
- src/styles: shared styles, if there are some common styles need to share across components, consider add it to this destination
- static: public assets

# Responsive

Project supports multiple screen size with 2 main breakpoints 1100px, 700px and 3 viewport

# Introduction and Data Information

This is a prototype I created for the final project of group 6. The data is about Global Human Day, it presents how all humans spend their time on any given day. The data interface is a set of categorized activities of humans with the time they spend on those activities. The datasets also include data from many different countries.

There are 8 categories and 24 sub-categories are defined in the
data (check category value in the data.js)

# Goal

This visualization aims to:

- Make the data comparable between countries and the global average
- Make the data comparable between each category and sub-category

# Design decision

- Using a double-stacked bar graph: compared to the original chart of the global human day using the Voronoi pie chart, I found that it's quite hard to make a comparison between two Voronoi pie charts. Since the data is based on a 24-hour format, a linear chart with embedded lines (for the information) is chosen. The double-stacked bar also helps users compare the category usage and its sub-category usage.

- Using descending opacity color for each category: This helps emphasize the bar self-documenting by using both the bar length and its color.

- Short comparison: Because the data is complicated, it still takes time to make a comparison. I decided to make a quick short comparison between countries and the global average.

- Interaction:

  - Change parameters: Allow users to figure out the data across countries and compare it with the global average. Using drop-down takes out the visual space but it could self-document itself and be pretty easy to use. In the real project, there will be a lot of countries so I added the search feature to the drop-down also.

  - Change alignments/Re-arrangement: From the reorder functionality, I allow users to change the alignments of the stacked bar with 2 criterias and orders. This could help users easy to compare the first segment (highest or lowest time-consuming) and the total with a more flexible comparison.

  - Embbed information: This is some kind of reducing visualization strategy. There are a lot of categories and the category name is pretty long and easy to overlap each other, which made the visualization complicated. Therefore, I decided to hide the category name until users hover near the bar (or the line/point/text). While users order by hours, the overlapping is worst, so I decided to hide the line also until users hover over the bar. If users still think lines are too noisy, I allow them to turn off the line through the checkbox

# Future improvements

- The overlapping algorithm: Although this part is very hard, I think I could improve the overlap label and line issue with more suitable positioning if I have enough time. So I don't have to hide them when sorting anymore.

- Zoom in/out features: Since some of the activities are very small, a zoom feature could help users access them.
