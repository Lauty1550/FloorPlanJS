import useUserSearch from "../hooks/useUserSearch";
import "../css/UserSearch.css";

export default function UserSearch({ render }) {
  const { debouncedSearch, search, setSearch, users } = useUserSearch();

  // Filtrar usuarios
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  return (
    <section className="search-container">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Buscar por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {render(filteredUsers)}
    </section>
  );
}
