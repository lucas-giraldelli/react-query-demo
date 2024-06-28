import { useSuperHeroesData } from "../hooks/useSuperHeroes";
import useFriendsData from "../hooks/useFriendsData";

export default function ParallelPage() {
  const { data: heroes } = useSuperHeroesData();
  const { data: friends } = useFriendsData();

  return (
    <>
      <p>heroes</p>
      {heroes?.map((hero) => (
        <div>{hero.name}</div>
      ))}
      <p>friends</p>
      {friends?.map((friend) => (
        <div>{friend.name}</div>
      ))}
    </>
  );
}
