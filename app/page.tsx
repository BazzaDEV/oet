import OET from "components/oet/OET";

export default function Home() {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="tracking-tighter text-center m-10 text-4xl sm:text-5xl">
        Optimal Enchant Tool
      </h1>
      <p className="text-center mx-2 text-slate-500">
        {`The only tool you'll ever need to combine tools, items, and armor in an
        anvil.`}
      </p>
      <OET />
    </main>
  );
}
