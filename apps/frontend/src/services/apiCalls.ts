import { useEffect, useState } from "react";
import { api } from "./api";


interface BlogProps
{
  id: string;
  type: string;
  engine: string;
  thumbnail: string;
  title: string;
  description: string;
  description2: string;
  description3: string;
  description4: string;
  description5: string;
  // photos: Photo[];
  // video: Video[];
}

export function useLatestBlogs() {
    const [blog, setBlogs] = useState<BlogProps[]>([]);
  
    useEffect(() => {
      api.get('/blogs/latest').then((response) => {
        setBlogs(response.data);
      });
    }, []);
  
    return blog;
}

export function useBlogs() {
    const [blogs, setBlogs] = useState<BlogProps[]>([]);
  
    useEffect(() => {
      api.get('/blogs').then((response) => {
        setBlogs(response.data);
      });
    }, []);
  
    return blogs;
}

