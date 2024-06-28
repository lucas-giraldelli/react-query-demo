import axios from "axios";
import { useQuery } from "react-query";

function fetchFriends() {
  return axios.get('http://localhost:4000/friends');
}

export type FriendsDto = {
  id: number;
  name: string;
}

export default function useFriendsData()  {
  return useQuery({
    queryKey: ['friends'],
    queryFn: fetchFriends,
    select: (data) => {
      console.log({data});
      const friends: Array<FriendsDto> = data.data.map((hero: FriendsDto) => hero);
      return friends
  }
  })
}