import Nav from './Nav';
import NavItem from './NavItem';
import List from './List';
import ListItem from './ListItem';
import { videosProps } from '../../app/page';


const movies = [
  {
    id: 1,
    image: "https://www.youtube.com/watch?v=o__SII_T8tk",
    title: "Prognosis Negative",
    starRating: 2.66,
    rating: "18A",
    year: 2020,
    genre: "Comedy",
    runtime: "1h 46m",
    cast: "Simon Pegg, Zach Galifianakis"
  },
  {
    id: 2,
    image: "https://www.youtube.com/watch?v=o__SII_T8tk",
    title: "Prognosis Negative",
    starRating: 2.66,
    rating: "18A",
    year: 2020,
    genre: "Comedy",
    runtime: "1h 46m",
    cast: "Simon Pegg, Zach Galifianakis"
  },
  {
    id: 3,
    image: "https://www.youtube.com/watch?v=o__SII_T8tk",
    title: "Prognosis Negative",
    starRating: 2.66,
    rating: "18A",
    year: 2020,
    genre: "Comedy",
    runtime: "1h 46m",
    cast: "Simon Pegg, Zach Galifianakis"
  },
  {
    id: 4,
    image: "https://www.youtube.com/watch?v=o__SII_T8tk",
    title: "Prognosis Negative",
    starRating: 2.66,
    rating: "18A",
    year: 2020,
    genre: "Comedy",
    runtime: "1h 46m",
    cast: "Simon Pegg, Zach Galifianakis"
  },
  {
    id: 5,
    image: "https://www.youtube.com/watch?v=o__SII_T8tk",
    title: "Prognosis Negative",
    starRating: 2.66,
    rating: "18A",
    year: 2020,
    genre: "Comedy",
    runtime: "1h 46m",
    cast: "Simon Pegg, Zach Galifianakis"
  },
  {
    id: 6,
    image: "https://www.youtube.com/watch?v=o__SII_T8tk",
    title: "Prognosis Negative",
    starRating: 2.66,
    rating: "18A",
    year: 2020,
    genre: "Comedy",
    runtime: "1h 46m",
    cast: "Simon Pegg, Zach Galifianakis"
  },
  {
    id: 7,
    image: "https://www.youtube.com/watch?v=o__SII_T8tk",
    title: "Prognosis Negative",
    starRating: 2.66,
    rating: "18A",
    year: 2020,
    genre: "Comedy",
    runtime: "1h 46m",
    cast: "Simon Pegg, Zach Galifianakis"
  },
]

interface VideosProps {
  data: videosProps[];
}

export default function Videos( {data} : VideosProps) {

  
  return (
    <div className="h-[70vh] divide-y divide-slate-100 overflow-hidden">
      <Nav>
        <NavItem href="/new" isActive>New Releases</NavItem>
        <NavItem href="/top">Top Rated</NavItem>
        <NavItem href="/picks">Vincent’s Picks</NavItem>
      </Nav>
      <List>
        {data.map((data) => (
          <ListItem key={data.id} video={data} />
        ))}
      </List>
    </div>
  );
}
