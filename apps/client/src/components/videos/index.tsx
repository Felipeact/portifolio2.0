import Nav from './Nav';
import NavItem from './NavItem';
import List from './List';
import ListItem from './ListItem';
import { videosProps } from '../../app/page';

interface VideosProps {
  data: videosProps[];
}

export default function Videos( {data} : VideosProps) {

  
  return (
    <div className="h-[85vh] divide-y divide-slate-100 overflow-hidden pb-16">
      <Nav>
        <NavItem href="/new" isActive>Videos</NavItem>
        <NavItem href="/top">Playlist</NavItem>
        <NavItem href="/picks">Tutorials</NavItem>
      </Nav>
      <List>
        {data.map((data) => (
          <ListItem key={data.id} video={data} />
        ))}
      </List>
    </div>
  );
}
