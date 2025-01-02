import Cards from "./cards";

function GridExample({ data }) {
  return (
    <div>
      <Cards
        color={"#ffa3a3"}
        label={"Negative"}
        data={data?.filter((p) => p.label === "Negative")}
      />

      <Cards
        color={"#a3ffab"}
        label={"Positive"}
        data={data?.filter((p) => p.label === "Positive")}
      />
      <Cards
        color={"#fdffa3"}
        label={"Neutral"}
        data={data?.filter((p) => p.label === "Neutral")}
      />
      <Cards
        color={"#ffa3a3"}
        label={"Political"}
        data={data?.filter((p) => p.label === "Political")}
      />
    </div>
  );
}

export default GridExample;
