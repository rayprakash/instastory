
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost } from "@/types/blog";
import { X, Save, ArrowLeft, Upload, FileImage } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Basic validation for the slug field
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
};

interface BlogPostEditorProps {
  post: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogPostEditor = ({ post, onSave, onCancel }: BlogPostEditorProps) => {
  const isNewPost = !post;
  
  const [postData, setPostData] = useState<BlogPost>({
    id: post?.id || '',
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    featuredImage: post?.featuredImage || '',
    keywords: post?.keywords || [],
    author: post?.author || 'Admin',
    publishDate: post?.publishDate || new Date().toISOString(),
    status: post?.status || 'draft'
  });
  
  const [keywordsInput, setKeywordsInput] = useState(post?.keywords.join(', ') || '');
  const [previewHtml, setPreviewHtml] = useState(post?.content || '');
  
  // Auto-generate slug when title changes
  useEffect(() => {
    if (!postData.slug || postData.slug === slugify(post?.title || '')) {
      setPostData(prev => ({
        ...prev,
        slug: slugify(prev.title)
      }));
    }
  }, [postData.title, post]);

  // Update preview HTML when content changes
  useEffect(() => {
    setPreviewHtml(postData.content);
  }, [postData.content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleKeywordsChange = (value: string) => {
    setKeywordsInput(value);
    const keywords = value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    setPostData(prev => ({ ...prev, keywords }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(postData);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onCancel} className="mr-2">
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          <h2 className="text-2xl font-bold">
            {isNewPost ? "Create New Post" : "Edit Post"}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-blue-gradient hover:opacity-90"
          >
            <Save size={16} className="mr-2" />
            {postData.status === 'draft' ? 'Save Draft' : 'Publish Post'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                    placeholder="Post title"
                    className="text-lg font-medium"
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={postData.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary of your post (will be displayed in blog listings)"
                    className="resize-none"
                    rows={2}
                  />
                </div>
                
                <Tabs defaultValue="write">
                  <TabsList className="mb-4">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      name="content"
                      value={postData.content}
                      onChange={handleChange}
                      placeholder="Write your post content here... HTML is supported for formatting"
                      className="min-h-[400px] font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt; for formatting.
                    </p>
                  </TabsContent>
                  <TabsContent value="preview" className="min-h-[400px] border rounded-md p-4 overflow-auto">
                    <div className="prose max-w-none">
                      {previewHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                      ) : (
                        <p className="text-muted-foreground">Nothing to preview yet.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={postData.status} 
                    onValueChange={(value) => setPostData(prev => ({ ...prev, status: value as 'draft' | 'published' }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={postData.slug}
                    onChange={handleChange}
                    placeholder="post-url-slug"
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    The URL will be: /blog/{postData.slug || 'post-slug'}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    name="publishDate"
                    type="datetime-local"
                    value={new Date(postData.publishDate).toISOString().slice(0, 16)}
                    onChange={(e) => setPostData(prev => ({ 
                      ...prev, 
                      publishDate: new Date(e.target.value).toISOString() 
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SEO & Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={keywordsInput}
                    onChange={(e) => handleKeywordsChange(e.target.value)}
                    placeholder="Enter keywords separated by commas"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Add relevant keywords to improve SEO
                  </p>
                </div>
                
                {postData.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {postData.keywords.map((tag, index) => (
                      <div 
                        key={index}
                        className="bg-instablue-100 text-instablue-800 text-xs px-2 py-1 rounded-full flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => {
                            const newKeywords = postData.keywords.filter((_, i) => i !== index);
                            setPostData(prev => ({ ...prev, keywords: newKeywords }));
                            setKeywordsInput(newKeywords.join(', '));
                          }}
                          className="ml-1 hover:bg-instablue-200 rounded-full p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="featuredImage">Image URL</Label>
                <Input
                  id="featuredImage"
                  name="featuredImage"
                  value={postData.featuredImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                
                {postData.featuredImage ? (
                  <div className="mt-2">
                    <p className="text-sm mb-2">Preview:</p>
                    <div className="relative rounded-md overflow-hidden border h-[150px]">
                      <img 
                        src={postData.featuredImage} 
                        alt="Featured image preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                        }}
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white"
                        onClick={() => setPostData(prev => ({ ...prev, featuredImage: '' }))}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full">
                    <FileImage size={16} className="mr-2" />
                    Select Image
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;
