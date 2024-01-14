<script>
  import { Graphic, Section, DiscreteLegend, Line } from "@snlab/florence";
  import { scaleLinear } from "d3-scale";
  const scaleX = scaleLinear().domain([0, 150]);
  const scaleY = scaleLinear().domain([0, 10]);
</script>

<div>
  <Graphic width={550} height={350}>
    <Section x1={0.27} x2={0.07} y1={0.86} y2={0.1} {scaleX} {scaleY}>
      <Line strokeWidth={1} x={[6, 6]} y={[0, 12]} />
    </Section>

    <Section x1={0.53} x2={0.09} y1={0.86} y2={0.1} {scaleX} {scaleY}>
      <Line strokeWidth={1} x={[6, 6]} y={[0, 12]} />
    </Section>
    <Section x1={0.786} x2={0.09} y1={0.86} y2={0.1} {scaleX} {scaleY}>
      <Line strokeWidth={1} x={[6, 6]} y={[0, 12]} />
    </Section>

    <Section x1={0} x2={0.12} y1={0.44} y2={0.25}>
      <DiscreteLegend
        labelFont={"Barlow"}
        fill={["#9ecae1", "#6baed6", "#4292c6"]}
        labels={[
          "Food processing",
          "Food growth & collection",
          "Food preperation",
        ]}
      ></DiscreteLegend>
    </Section>
    <text x="0" y="45">
      <tspan x="2" dy="0.9em">Food</tspan>
      <tspan x="2" dy="1.2em">provision</tspan>
    </text>
    <Section x1={0.28} x2={0.4} y1={0.44} y2={0.25}>
      <DiscreteLegend
        labelFont={"Barlow"}
        fill={["#8f9aab", "#565e84", "#4f5983"]}
        labels={["Infrastructure", "Buildings", "Artifacts"]}
      ></DiscreteLegend>
    </Section>
    <text x="170" y="45">
      <tspan x="153" dy="0.9em">Technosphere</tspan>
      <tspan x="155" dy="1.2em">creation</tspan>
    </text>
    <Section x1={0.54} x2={0.66} y1={0.37} y2={0.25}>
      <DiscreteLegend
        labelFont={"Barlow"}
        fill={["#fdb77a", "#fd8d3c"]}
        labels={["Energy", "Materials"]}
      ></DiscreteLegend>
    </Section>
    <text x="275" y="45">
      <tspan x="298" dy="0.9em">Nonfood</tspan>
      <tspan x="299" dy="1.2em">provision</tspan>
    </text>
    <Section x1={0.77} x2={0.89} y1={0.37} y2={0.25}>
      <DiscreteLegend
        labelFont={"Barlow"}
        fill={["#c9e4c3", "#b0d9b1"]}
        labels={["Waste management", "Inhabited environment"]}
      ></DiscreteLegend>
    </Section>
    <text x="275" y="45">
      <tspan x="426" dy="0.9em">Maintenance of </tspan>
      <tspan x="426" dy="1.2em">surroundings</tspan>
    </text>
    <Section x1={0} x2={0.12} y1={0.8} y2={0.6}>
      <DiscreteLegend
        labelFont={"Barlow"}
        fill={["#e88cb7", "#cb709b", "#af5481"]}
        labels={[
          "Material transportation",
          "Human transportation",
          "Allocation",
        ]}
      ></DiscreteLegend>
    </Section>
    <text x={2} y={188}>Organization</text>

    <Section x1={0.28} x2={0.4} y1={0.73} y2={0.6}>
      <DiscreteLegend
        labelFont={"Barlow"}
        fill={["#e8767a", "#d25e62"]}
        labels={["Religious practice", "Schooling & research"]}
      ></DiscreteLegend>
    </Section>
    <text x="156" y="170">
      <tspan x="156" dy="1.2em">Deliberate neural</tspan>
      <tspan x="156" dy="1.2em">restructuring</tspan>
    </text>
    <Section x1={0.54} x2={0.66} y1={0.85} y2={0.6}>
      <DiscreteLegend
        labelFont={"Barlow"}
        fill={["#abd7c8", "#93bfb0", "#7ba799", "#639082"]}
        labels={[
          "Health care",
          "Physical child care",
          "Hygiene & grooming",
          "Sleep & bed Rest",
        ]}
      ></DiscreteLegend>
    </Section>
    <text x="180" y="170">
      <tspan x="298" dy="1.2em">Somatic</tspan>
      <tspan x="298" dy="1.2em">maintenance</tspan>
    </text>
    <Section x1={0.77} x2={0.89} y1={0.91} y2={0.6}>
      <DiscreteLegend
        labelFont={"Barlow"}
        fill={["#d9c0ee", "#b095c6", "#8262a0", "#633f81", "#602a81"]}
        labels={[
          "Active recreation",
          "Interactive",
          "Social",
          "Meals",
          "Passive",
        ]}
      >
        <text x="180" y="170">
          <tspan x="425" dy="1.2em">Experience</tspan>
          <tspan x="425" dy="1.2em">oriented</tspan>
        </text>
      </DiscreteLegend>
    </Section>
  </Graphic>
</div>
