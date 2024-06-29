import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export default function RQSuperHero() {
  const { heroId } = useParams();

  const { data: hero, isLoading } = useSuperHeroData(heroId || "");

  console.log({ hero });

  if (isLoading) {
    return <h2>Loading data...</h2>;
  }

  return (
    <>
      <div>Super Hero Details</div>
      <p>name: {hero?.name}</p>
      <p>alter ego: {hero?.alterEgo}</p>
    </>
  );
}
