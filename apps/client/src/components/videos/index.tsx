import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import NavItem from './NavItem';
import List from './List';
import ListItem from './ListItem';
import { youtubeApi } from '../../services/youtubeApi';

interface VideoItem {
  id: {
    id:string,
    videoId: string
  }
  snippet: {
    title: string;
    publishedAt: string;
    videoOwnerChannelTitle: string;
    resourceId: {
      videoId: string;
    };
  };
}

export default function Videos() {
  const [activeNavItem, setActiveNavItem] = useState<string>('videos');
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {

        if (activeNavItem == "videos") {
          const res = await youtubeApi.get(
            `search?part=snippet&channelId=UCMYDSj6uAmnq4C_WvVF9C7g&maxResults=25&key=AIzaSyCqsrqtdjfs14LSFzgGP5rbzMMFFZyR7Xs`
          );
          const { items } = res.data;
          items.splice(0, 1)
          setVideos(items);
        } else if (activeNavItem == "videos") {
          const res = await youtubeApi.get(
            `playlistItems?part=snippet&playlistId=PL6N9OJFlyLL3GRwaMecUht1zghKqonAEQ&key=AIzaSyCqsrqtdjfs14LSFzgGP5rbzMMFFZyR7Xs`
          );
          const { items } = res.data;
          setVideos(items);
        }


      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  function setVideosOnNav(id: string) {
    setActiveNavItem(id === activeNavItem ? '' : id);
  }

  return (
    <div className="h-[85vh] divide-y divide-slate-100 overflow-hidden pb-16">
      <Nav>
        <NavItem
          id="videos"
          isActive={activeNavItem === 'videos'}
          setIsActive={() => setVideosOnNav('videos')}
        >
          Videos
        </NavItem>
        <NavItem
          id="playlist"
          isActive={activeNavItem === 'playlist'}
          setIsActive={() => setVideosOnNav('playlist')}
        >
          Playlist
        </NavItem>
        <NavItem
          id="tutorials"
          isActive={activeNavItem === 'tutorials'}
          setIsActive={() => setVideosOnNav('tutorials')}
        >
          Tutorials
        </NavItem>
      </Nav>
      <List>
        {activeNavItem === 'videos' ? (
          videos.map((video) => (
            <ListItem key={video.id.id} video={video} />
          ))
        ) : (
          activeNavItem === 'playlist' 
        )}
      </List>
    </div>
  );
}