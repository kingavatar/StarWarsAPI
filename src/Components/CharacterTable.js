import { Table, useAsyncList, useCollator } from "@nextui-org/react";
import { navigate } from "raviger";
import { useEffect } from "react";

export default function CharacterTable(props){
  const collator = useCollator({ numeric: true });
  async function sort({ items, sortDescriptor }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }
  async function load({ signal }) {
    return {
      items: props.data,
    };
  }

  const list = useAsyncList({ load, sort });
  useEffect(() => {
    list.reload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return (
    <Table
      aria-label="Character List table"
      css={{ height: "auto", minWidth: "100%" }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      selectionMode="single"
      onSelectionChange={(keys) => {
        const [url] = keys;
        const getCharId = url.substring(url.lastIndexOf("/") - 1);
        navigate(`/character/${getCharId}`, {
          state: { character: list.items.find(x=>x.url === url) },
        });
      }}
    >
      <Table.Header>
        <Table.Column key="name" allowsSorting>
          Name
        </Table.Column>
        <Table.Column key="gender" allowsSorting>
          Gender
        </Table.Column>
        <Table.Column key="height" allowsSorting>
          Height
        </Table.Column>
        <Table.Column key="mass" allowsSorting>
          Mass
        </Table.Column>
        <Table.Column key="films" allowsSorting>
          Films
        </Table.Column>
        <Table.Column key="vehicles" allowsSorting>
          Vehicles
        </Table.Column>
        <Table.Column key="starships" allowsSorting>
          Starships
        </Table.Column>
        <Table.Column key="birth_year" allowsSorting>
          Birth Year
        </Table.Column>
      </Table.Header>
      <Table.Body items={list.items} loadingState={list.loadingState}>
        {(item) => (
          <Table.Row key={item.url}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.gender}</Table.Cell>
            <Table.Cell>{item.height}</Table.Cell>
            <Table.Cell>{item.mass}</Table.Cell>
            <Table.Cell>{item.films.length}</Table.Cell>
            <Table.Cell>{item.vehicles.length}</Table.Cell>
            <Table.Cell>{item.starships.length}</Table.Cell>
            <Table.Cell>{item.birth_year}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
