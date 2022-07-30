import Link from "next/link";
import { useRouter } from "next/router";

function ClientName() {
  const router = useRouter();
  const name = router.query.clientId;
  return (
    <div>
      <h2>Client NickName: {name}</h2>
      <Link href={`/clients/${name}/${name}`}>View Client Details</Link>
    </div>
  );
}

export default ClientName;
