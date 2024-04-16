import { useState } from "preact/hooks";
import { JSX } from "preact";

export default function CreateInvoice() {
  const [form, setForm] = useState<Invoice>();
  const [lines, setLines] = useState<InvoiceLine[]>([]);
  const [taxs, setTaxs] = useState<InvoiceTax[]>([]);

  const handleAddLine = () => {
    setLines([
      ...lines,
      {
        id: `${lines.length + 1}`,
        description: "",
        quantity: 0,
        price: 0,
        total: 0,
      },
    ]);
  };

  /*
  const handleAddForm = () => {
    setForm([
    ...form,
    {
      name: "",
    },
  ]);
  };*/

  const handleRemoveLine = (id: string) => {
    setLines(lines.filter((line) => line.id === id));
  };

  const handleAddTax = () => {
    setTaxs([
      ...taxs,
      {
        id: `${taxs.length + 1}`,
        description: "",
        rate: 0,
        total: 0,
      },
    ]);
  };

  const handleRemoveTax = (id: string) => {
    setTaxs(taxs.filter((tax) => tax.id === id));
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    try {
      fetch("/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          lines,
          taxs,
        }),
      });
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  const Responsive = (
    { children }: { children: any },
  ) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        borderRadius: "5px",
      }}
    >
      {children}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        color: "#fff",
        padding: "20px",
        width: "100%",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Responsive>
        <label>
          Name
        </label>
        <input
          type="text"
          value={form?.name}
          onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
        />
        <label>
          Number
        </label>
        <input
          type="text"
          value={form?.number}
          onChange={(e) => setForm({ ...form, number: e.currentTarget.value })}
        />
        <label>
          Data
        </label>
        <input
          type="text"
          value={form?.data}
          onChange={(e) => setForm({ ...form, data: e.currentTarget.value })}
        />
        <label>
          Base
        </label>
        <input
          type="text"
          value={form?.base}
          onChange={(e) => setForm({ ...form, base: e.currentTarget.value })}
        />
        <label>
          Lines
        </label>
        {lines.map((line) => (
          <Responsive key={line.id}>
            <label>
              Description
            </label>
            <input
              type="text"
              value={line.description}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, description: e.currentTarget.value }
                      : l
                  ),
                )}
            />
            <label>
              Quantity
            </label>
            <input
              type="number"
              value={line.quantity}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, quantity: Number(e.currentTarget.value) }
                      : l
                  ),
                )}
            />
            <label>
              Price
            </label>
            <input
              type="number"
              value={line.price}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, price: Number(e.currentTarget.value) }
                      : l
                  ),
                )}
            />
            <label>
              Total
            </label>
            <input
              type="number"
              value={line.total}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, total: Number(e.currentTarget.value) }
                      : l
                  ),
                )}
            />
            <button
              onClick={() => handleRemoveLine(line.id)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                width: "100%",
              }}
              type="button"
            >
              Remove Line
            </button>
          </Responsive>
        ))}
        <button
          onClick={handleAddLine}
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            width: "100%",
          }}
          type="button"
        >
          Add Line
        </button>
        <label>
          Taxs
        </label>
        {taxs.map((tax) => (
          <Responsive key={tax.id}>
            <label>
              Description
            </label>
            <input
              type="text"
              value={tax.description}
              onChange={(e) =>
                setTaxs(
                  taxs.map((t) =>
                    t.id === tax.id
                      ? { ...t, description: e.currentTarget.value }
                      : t
                  ),
                )}
            />
            <label>
              Rate
            </label>
            <input
              type="number"
              value={tax.rate}
              onChange={(e) =>
                setTaxs(
                  taxs.map((t) =>
                    t.id === tax.id
                      ? { ...t, rate: Number(e.currentTarget.value) }
                      : t
                  ),
                )}
            />
            <label>
              Total
            </label>
            <input
              type="number"
              value={tax.total}
              onChange={(e) =>
                setTaxs(
                  taxs.map((t) =>
                    t.id === tax.id
                      ? { ...t, total: Number(e.currentTarget.value) }
                      : t
                  ),
                )}
            />
            <button
              onClick={() => handleRemoveTax(tax.id)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                width: "100%",
              }}
              type="button"
            >
              Remove Tax
            </button>
          </Responsive>
        ))}
        <button
          onClick={handleAddTax}
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            width: "100%",
          }}
          type="button"
        >
          Add Tax
        </button>
        <label>
          Total
        </label>
        <input
          type="number"
          value={form?.total}
          onChange={(e) => setForm({ ...form, total: e.currentTarget.value })}
        />
      </Responsive>
      <button
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#fff",
          color: "#000",
          border: "none",
          width: "100%",
        }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

type Invoice = {
  name: string;
  number: number;
  data: number;
  base: number;
  total: number;
};

type InvoiceLine = {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
};

type InvoiceTax = {
  id: string;
  description: string;
  rate: number;
  total: number;
};
