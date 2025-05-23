import { useEffect, useState } from "react";
import { api } from "./api";


export interface BlogProps
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
  createdAt: string;
  tags: string[]
  photos: Photo[]
  videos: Video[];
}

export interface ProjectProps
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
  createdAt: string;
  tags: string[]
  photos: Photo[]
  videos: Video[];
}

interface Photo {
  id: number;
  url: string
  title: string;
  size: number;
  description: string;
}

interface Video 
{
  id: number;
  url: string
  title: string;
  size: number;
  description: string;
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

export function useBlogById( id: string) 
{
  const [ blog, setBlog ] = useState<BlogProps>();

  useEffect(() => {

    api.get(`/blogs/${id}`).then((response) =>{
      setBlog(response.data);
    })

  },[])

  return blog;

}

// Project

export function useLatestProjects() {
    const [project, setProjects] = useState<ProjectProps[]>([]);
  
    useEffect(() => {
      api.get('/projects/latest').then((response) => {
        setProjects(response.data);
      });
    }, []);
  
    return project;
}

export function useProjects() {
    const [project, setProjects] = useState<ProjectProps[]>([]);
  
    useEffect(() => {
      api.get('/projects').then((response) => {
        setProjects(response.data);
      });
    }, []);
  
    return project;
}

export function useProjectById( id: string) 
{
  const [ project, setProjects ] = useState<ProjectProps>();

  useEffect(() => {

    api.get(`/projects/${id}`).then((response) =>{
      setProjects(response.data);
    })

  },[])

  return project;

}

