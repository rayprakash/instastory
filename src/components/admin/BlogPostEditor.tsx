
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost, defaultImageConfig, ImageUploadConfig } from "@/types/blog";
import { X, Save, ArrowLeft, Upload, FileImage, Bold, Italic, List, ListOrdered, Image, Link as LinkIcon, Code, Heading1, Heading2, Heading3 } from "lucide-react";
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
import { toast } from 'sonner';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  
  const [postData, setPostData] = useState<BlogPost>({
    id: post?.id || '',
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    featuredImage: post?.featuredImage || '',
    contentImages: post?.contentImages || [],
    keywords: post?.keywords || [],
    author: post?.author || 'Admin',
    publishDate: post?.publishDate || new Date().toISOString(),
    status: post?.status || 'draft',
    imageAlt: post?.imageAlt || '',
  });
  
  const [keywordsInput, setKeywordsInput] = useState(post?.keywords.join(', ') || '');
  const [previewHtml, setPreviewHtml] = useState(post?.content || '');
  const [imageConfig, setImageConfig] = useState<ImageUploadConfig>(defaultImageConfig);
  
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
    toast.success(isNewPost ? "Post created successfully!" : "Post updated successfully!");
  };

  const handleImageUpload = (file: File, isFeatured = true) => {
    // In a real app, you would upload to a server and get back a URL
    // For now, we'll use a local URL and simulate the process
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        if (isFeatured) {
          setPostData(prev => ({ ...prev, featuredImage: e.target!.result as string }));
          toast.success("Featured image uploaded!");
        } else {
          // For content images, we'll insert at cursor position in the content
          insertImageAtCursor(e.target!.result as string);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const insertImageAtCursor = (imageUrl: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const imageTag = `<img src="${imageUrl}" alt="Blog content image" class="my-4 rounded-md max-w-full" />`;
    
    const newContent = textarea.value.substring(0, start) + imageTag + textarea.value.substring(end);
    
    setPostData(prev => ({ ...prev, content: newContent }));
    
    // Set cursor position after the inserted image tag
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + imageTag.length, start + imageTag.length);
    }, 0);
    
    toast.success("Image inserted into content!");
  };

  const handleFormatClick = (tag: string, openClose = true) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let newText;
    
    if (openClose) {
      // For tags that need opening and closing (like <strong>, <em>, etc.)
      newText = `<${tag}>${selectedText}</${tag}>`;
    } else {
      // For self-closing tags or special cases
      switch(tag) {
        case 'ul':
          newText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n  <li>List item</li>\n</ul>`;
          break;
        case 'ol':
          newText = `<ol>\n  <li>${selectedText || 'List item'}</li>\n  <li>List item</li>\n</ol>`;
          break;
        case 'h1':
          newText = `<h1>${selectedText || 'Heading 1'}</h1>`;
          break;
        case 'h2':
          newText = `<h2>${selectedText || 'Heading 2'}</h2>`;
          break;
        case 'h3':
          newText = `<h3>${selectedText || 'Heading 3'}</h3>`;
          break;
        case 'a':
          newText = `<a href="https://example.com" target="_blank">${selectedText || 'Link text'}</a>`;
          break;
        case 'code':
          newText = `<pre><code>${selectedText || 'Your code here'}</code></pre>`;
          break;
        case 'img':
          if (contentImageInputRef.current) {
            contentImageInputRef.current.click();
            return;
          }
          break;
        default:
          newText = selectedText;
      }
    }
    
    const newContent = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    
    setPostData(prev => ({ ...prev, content: newContent }));
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const imageConfigOptions = (
    <div className="space-y-4 mt-4 border-t pt-4">
      <h4 className="font-medium text-sm">Image Upload Settings</h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="maxWidth">Max Width (px)</Label>
          <Input
            id="maxWidth"
            type="number"
            value={imageConfig.maxWidth}
            onChange={(e) => setImageConfig({...imageConfig, maxWidth: Number(e.target.value)})}
          />
        </div>
        <div>
          <Label htmlFor="maxHeight">Max Height (px)</Label>
          <Input
            id="maxHeight"
            type="number"
            value={imageConfig.maxHeight}
            onChange={(e) => setImageConfig({...imageConfig, maxHeight: Number(e.target.value)})}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quality">Quality (%)</Label>
          <Input
            id="quality"
            type="number"
            min="1"
            max="100"
            value={imageConfig.quality}
            onChange={(e) => setImageConfig({...imageConfig, quality: Number(e.target.value)})}
          />
        </div>
        <div>
          <Label htmlFor="format">Format</Label>
          <Select 
            value={imageConfig.format} 
            onValueChange={(value) => setImageConfig({...imageConfig, format: value as 'jpeg' | 'png' | 'webp'})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground">
        These settings will be applied to newly uploaded images.
      </p>
    </div>
  );
  
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
                    <div className="border rounded-md p-2 mb-2 flex flex-wrap gap-1 bg-white">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('strong')}
                        title="Bold"
                      >
                        <Bold size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('em')}
                        title="Italic"
                      >
                        <Italic size={16} />
                      </Button>
                      <Separator orientation="vertical" className="h-8" />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('h1', false)}
                        title="Heading 1"
                      >
                        <Heading1 size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('h2', false)}
                        title="Heading 2"
                      >
                        <Heading2 size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('h3', false)}
                        title="Heading 3"
                      >
                        <Heading3 size={16} />
                      </Button>
                      <Separator orientation="vertical" className="h-8" />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('ul', false)}
                        title="Bullet List"
                      >
                        <List size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('ol', false)}
                        title="Numbered List"
                      >
                        <ListOrdered size={16} />
                      </Button>
                      <Separator orientation="vertical" className="h-8" />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('a', false)}
                        title="Insert Link"
                      >
                        <LinkIcon size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('img', false)}
                        title="Insert Image"
                      >
                        <Image size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleFormatClick('code', false)}
                        title="Insert Code Block"
                      >
                        <Code size={16} />
                      </Button>
                    </div>
                    
                    <Textarea
                      name="content"
                      value={postData.content}
                      onChange={handleChange}
                      placeholder="Write your post content here... HTML is supported for formatting"
                      className="min-h-[400px] font-mono text-sm"
                      ref={textareaRef}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Use the formatting toolbar above to add rich content to your post.
                    </p>
                    
                    {/* Hidden file input for content images */}
                    <input 
                      type="file"
                      ref={contentImageInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0], false);
                          e.target.value = '';
                        }
                      }}
                    />
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
                <div className="flex items-center gap-2">
                  <Label htmlFor="featuredImage">Image URL</Label>
                  <p className="text-xs text-muted-foreground">or</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={14} className="mr-1" /> Upload
                  </Button>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(e.target.files[0]);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                
                <Input
                  id="featuredImage"
                  name="featuredImage"
                  value={postData.featuredImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                
                <div>
                  <Label htmlFor="imageAlt">Image Alt Text</Label>
                  <Input
                    id="imageAlt"
                    name="imageAlt"
                    value={postData.imageAlt || ''}
                    onChange={handleChange}
                    placeholder="Descriptive text for the image"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Good for SEO and accessibility
                  </p>
                </div>
                
                {postData.featuredImage ? (
                  <div className="mt-2">
                    <p className="text-sm mb-2">Preview:</p>
                    <div className="relative rounded-md overflow-hidden border h-[150px]">
                      <img 
                        src={postData.featuredImage} 
                        alt={postData.imageAlt || "Featured image preview"}
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
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center">
                    <FileImage size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">No featured image selected</p>
                  </div>
                )}
                
                {imageConfigOptions}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;
