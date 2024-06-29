import axios from "axios";
import { useQuery } from "react-query";

type DependantQueryProps = {
  email: string;
};

const fetchContent = (URL: string) => {
  return axios.get(URL);
};

type User = {
  id: string;
  channelId: string;
};

type Channel = {
  id: string;
  courses: string[];
};

export default function DependantQuery({ email }: DependantQueryProps) {
  const baseURL = "http://localhost:4000";

  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchContent(`${baseURL}/users/${email}`),
    select: (data) => {
      return data.data as User;
    },
  });

  const channelId = user?.channelId;

  const { data: channel } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => fetchContent(`${baseURL}/channels/${channelId}`),
    enabled: Boolean(channelId),
    select: (data) => {
      return data.data as Channel;
    },
  });

  return (
    <>
      {channel?.courses.map((c) => (
        <div key={c}>{c}</div>
      ))}
    </>
  );
}
