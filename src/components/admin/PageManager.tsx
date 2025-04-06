
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, Plus, Save, FileText } from 'lucide-react';
import { toast } from "sonner";

interface PageManagerProps {
  onSave: () => void;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

const PageManager = ({ onSave }: PageManagerProps) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load pages from localStorage
  useEffect(() => {
    setIsLoading(true);
    const savedPages = localStorage.getItem('instaview-pages');
    setPages(savedPages ? JSON.parse(savedPages) : []);
    setIsLoading(false);
  }, []);
  
  // Save pages to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('instaview-pages', JSON.stringify(pages));
    }
  }, [pages, isLoading]);
  
  const handleAddNew = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: 'New Page',
      slug: 'new-page',
      content: '',
      createdAt: new Date().toISOString(),
    };
    setCurrentPage(newPage);
    setIsEditing(true);
  };
  
  const handleEdit = (page: Page) => {
    setCurrentPage({ ...page });
    setIsEditing(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter(page => page.id !== id));
      if (currentPage?.id === id) {
        setCurrentPage(null);
        setIsEditing(false);
      }
      toast.success("Page deleted successfully");
      onSave();
    }
  };
  
  const handleSave = () => {
    if (!currentPage) return;
    
    const newSlug = currentPage.slug.toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const updatedPage = { ...currentPage, slug: newSlug };
    
    if (pages.find(p => p.id === updatedPage.id)) {
      setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p));
      toast.success("Page updated successfully");
    } else {
      setPages([...pages, updatedPage]);
      toast.success("Page created successfully");
    }
    
    setCurrentPage(null);
    setIsEditing(false);
    onSave();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentPage) return;
    
    const { name, value } = e.target;
    setCurrentPage({ ...currentPage, [name]: value });
  };
  
  if (isLoading) {
    return <div className="py-8 text-center">Loading pages...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Page Manager</h2>
        <Button 
          onClick={handleAddNew}
          className="bg-blue-gradient hover:opacity-90"
        >
          <Plus size={16} className="mr-1" /> New Page
        </Button>
      </div>
      
      {isEditing && currentPage ? (
        <div className="card-gradient p-6 rounded-lg">
          <h3 className="text-xl font-medium mb-4">
            {currentPage.id ? 'Edit Page' : 'Create New Page'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
              <Input 
                name="title"
                value={currentPage.title}
                onChange={handleChange}
                className="w-full"
                placeholder="Enter page title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
              <Input 
                name="slug"
                value={currentPage.slug}
                onChange={handleChange}
                className="w-full"
                placeholder="page-slug"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be the URL of your page: yourdomain.com/{currentPage.slug}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <Textarea
                name="content"
                value={currentPage.content}
                onChange={handleChange}
                className="w-full min-h-[300px]"
                placeholder="Enter page content (HTML supported)"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => {
                  setCurrentPage(null);
                  setIsEditing(false);
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-blue-gradient hover:opacity-90"
              >
                <Save size={16} className="mr-1" /> Save Page
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {pages.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{page.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        /{page.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(page.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          onClick={() => handleEdit(page)}
                          variant="ghost"
                          size="sm"
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          onClick={() => handleDelete(page.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 card-gradient rounded-lg">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Pages Created Yet</h3>
              <p className="text-gray-500 mb-4">Create your first page to get started</p>
              <Button 
                onClick={handleAddNew}
                className="bg-blue-gradient hover:opacity-90"
              >
                <Plus size={16} className="mr-1" /> Create First Page
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PageManager;
