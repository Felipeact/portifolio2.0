import Nav from './Nav';
import NavItem from './NavItem';
import List from './List';
import ListItem from './ListItem';
import { videosProps } from '../../app/page';
import { useState } from 'react';

interface VideosProps {
  data: videosProps[];
}

export default function Videos( {data} : VideosProps) {
  const [activeNavItem, setActiveNavItem] = useState<string>('videos'); // Use a string as ID/key

  function setVideosOnNav(id: string) {
    setActiveNavItem(id === activeNavItem ? '' : id); // Toggle activeNavItem based on ID
  }

  return (
    <div className="h-[85vh] divide-y divide-slate-100 overflow-hidden pb-16">
      <Nav>
        <NavItem id="videos" isActive={activeNavItem === 'videos'} setIsActive={() => setVideosOnNav('videos')}>
          Videos
        </NavItem>
        <NavItem id="playlist" isActive={activeNavItem === 'playlist'} setIsActive={() => setVideosOnNav('playlist')}>
          Playlist
        </NavItem>
        <NavItem id="tutorials" isActive={activeNavItem === 'tutorials'} setIsActive={() => setVideosOnNav('tutorials')}>
          Tutorials
        </NavItem>
      </Nav>
      <List>
        {
          activeNavItem === 'videos' ? (
            data.map((data) => (
              <ListItem key={data.id} video={data} />
            ))
          ) : (
            <div></div>
          )
        }
        
      </List>
    </div>
  );
}
