import { getPeople } from '@/lib/opshubClient';

export default async function peoplePage() {
  const people = await getPeople();


  return (
    <div>
      <h1>people</h1>
      <ul>
        {people.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}