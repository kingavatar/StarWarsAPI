import { Dropdown } from "@nextui-org/react";
import { IconReload } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchSwapi } from "../APIs/fetchSwapi";

export default function SpeciesFilter(props) {
  const [selectedSpecies, setSelectedSpecies] = useState(
    new Set(["All Species"])
  );

  const [isOpen, setIsOpen] = useState(false);

  

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["speciesInfinite"],
    ({ pageParam = 1 }) => fetchSwapi("species", pageParam),
    {
      getNextPageParam: (lastPage) => {
        const nextPageUrl = lastPage.next;
        if (nextPageUrl)
          return Number(nextPageUrl.charAt(nextPageUrl.length - 1));
        return false;
      },
    }
  );

  const selectedSpeciesValue = useMemo(
    () => Array.from(selectedSpecies).join(", "),
    [selectedSpecies]
  );

  const handleSpecies = props.setSpecies;
  useMemo(() => {
    const species = data?.pages
      .flatMap((x) => x.results)
      .find((item) => item.name === selectedSpeciesValue);
    handleSpecies(species);
  }, [data?.pages, selectedSpeciesValue, handleSpecies]);

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
        {selectedSpeciesValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions for Species"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        containerCss={{ mt: "-60px" }}
        selectedKeys={selectedSpecies}
        disabledKeys={!hasNextPage || isFetchingNextPage ? ["loadMore"] : []}
        onSelectionChange={(keys) => {
          if (keys.currentKey === "loadMore") {
            if (hasNextPage) fetchNextPage();
          } else {
            setSelectedSpecies(keys);
          }
        }}
      >
        {isLoading ? (
          <Dropdown.Section title="Loading">
            <Dropdown.Item
              color="secondary"
              key="loading"
              description="Loading the Species"
            >
              Loading
            </Dropdown.Item>
          </Dropdown.Section>
        ) : isError ? (
          <Dropdown.Section title="Error">
            <Dropdown.Item
              color="error"
              key="error"
              description="Error has occured when loading the Species"
            >
              Error Occured
            </Dropdown.Item>
          </Dropdown.Section>
        ) : (
          data && [
            <Dropdown.Section title="Species">
              {data.pages.map((group, i) =>
                group.results.map((item) => (
                  <Dropdown.Item key={item.name}>{item.name}</Dropdown.Item>
                ))
              )}
            </Dropdown.Section>,
            <Dropdown.Section title="Actions">
              <Dropdown.Item
                key="loadMore"
                color="secondary"
                description="Load More Species"
                icon={<IconReload size={22} />}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </Dropdown.Item>
            </Dropdown.Section>,
          ]
        )}
        <Dropdown.Section title="Select All">
          <Dropdown.Item key="All Species">All Species</Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
}
