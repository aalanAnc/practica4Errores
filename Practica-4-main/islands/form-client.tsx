import { useState } from "preact/hooks";
import { JSX } from "preact";

export default function ClientForm() {
  const [client, setClient] = useState<Client>({
    Name: "",
    Email: "",
    Address: "",
    City: "",
    Country: "",
    Phone: "",
  });

  function handleChange(
    event: any,
  ) {
    event.preventDefault();
    fetch("/api/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
      }}
      onSubmit={handleChange}
    >
      <input
        type="text"
        placeholder="Name"
        value={client?.Name}
        onChange={(event) =>
          setClient({ ...client, Name: event.currentTarget.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={client?.Email}
        onChange={(event) =>
          setClient({ ...client, Email: event.currentTarget.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={client?.Address}
        onChange={(event) =>
          setClient({ ...client, Address: event.currentTarget.value })}
      />
      <input
        type="text"
        placeholder="City"
        value={client?.City}
        onChange={(event) =>
          setClient({ ...client, City: event.currentTarget.value })}
      />
      <input
        type="text"
        placeholder="Country"
        value={client?.Country}
        onChange={(event) =>
          setClient({ ...client, Country: event.currentTarget.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={client?.Phone}
        onChange={(event) =>
          setClient({ ...client, Phone: event.currentTarget.value })}
      />
      <button type="submit">Create</button>
    </form>
  );
}

type Client = {
  Name: string;
  Email: string;
  Address: string;
  City: string;
  Country: string;
  Phone: string;
};
