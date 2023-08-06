import OET from "components/oet/OET";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="mb-10">
        <h1 className="text-center m-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text bg-300% animate-gradient">
          Optimal Enchant Tool
        </h1>
        <p className="text-center mx-2 text-slate-500">
          {`The only tool you'll ever need to combine tools, items, and armor in an
        anvil.`}
        </p>
      </div>
      <OET />
    </main>
  );
}
