import myAxios from "./myAxios";

 
export async function getCharacter(page = 1, search = "") {
  const { data } = await myAxios.get(`/people/`, {
    params: {
      page,
      search: search.trim() || "", 
    },
  });

  return {
    results: data.results,
    next: data.next,
    previous: data.previous,
    count: data.count,
  };
}


export async function getSpeciesDetails(url) {
  if (!url) return null;
  const { data } = await myAxios.get(url);
  return data;
}

 
export async function getHomeworld(url) {
  if (!url) return null;
  const { data } = await myAxios.get(url);
  return data;
}


 
export async function getFilms(url) {
  if (!url) return null;
  const { data } = await myAxios.get(url);
  return data;
}
