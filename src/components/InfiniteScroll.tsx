import React from "react";
import axios from "axios";

interface Iitems {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const InfiniteScroll: React.FC = () => {
  const [items, setItems] = React.useState<Iitems[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const batchSize = 20;
  const [page, setPage] = React.useState<number>(1);

// I used try catch to handle API requests, however I prefer reactQuery for handling api requests.
const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${batchSize}&q=${searchTerm}&_sort=${sortBy}`
      );
      setItems((prevItems) => [...prevItems, ...response.data]);
      setError(null);
    } catch (error) {
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !loading && !error) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
    setItems([]);
  };

  const handleSort = () => {
    setSortBy(sortBy === "title" ? "title_desc" : "title");
    setPage(1);
    setItems([]);
  };

  React.useEffect(() => {
    fetchData();
  }, [page, searchTerm, sortBy]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <input
        style={{
          height: "34px",
          borderRadius: "6px",
          width: "300px",
          border: "1px solid #999",
          marginRight: "10px",
        }}
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      Sort:{" "}
      <button onClick={handleSort}>
        {sortBy === "title" ? "Z to A" : "A to Z"}
      </button>
      {error && <p>{error}</p>}
      <ul>
        {items.length
          ? items.map((item: Iitems, i: number) => (
              <li key={i}>{item.title}</li>
            ))
          : !loading && <p>No data found!</p>}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
