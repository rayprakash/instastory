
import { useState } from "react";
import { Star } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah T.",
      rating: 5,
      text: "This tool is a game-changer! I can check stories without anyone knowing. Works flawlessly every time.",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Michael R.",
      rating: 5,
      text: "I was looking for a way to view stories anonymously, and this site does exactly what it promises. Simple and effective!",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 3,
      name: "Emily K.",
      rating: 4,
      text: "Great tool for viewing stories without being detected. The download feature is super useful for saving content.",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 4,
      name: "David L.",
      rating: 5,
      text: "I use this site daily to check competitors' content without leaving a trace. Works perfectly every time!",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 5,
      name: "Jessica W.",
      rating: 5,
      text: "Fast and reliable. I never worry about accidentally viewing stories anymore. Highly recommended!",
      avatar: "https://i.pravatar.cc/150?img=10",
    }
  ];

  return (
    <section className="section bg-gradient-to-br from-instablue-50 to-white" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-instablue-900">
            What Our Users Say
          </h2>
          <div className="flex justify-center items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} fill="#FFC107" color="#FFC107" />
            ))}
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who browse Instagram stories anonymously
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-2">
                  <div className="glass p-6 rounded-xl h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-instablue-900">{testimonial.name}</h3>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#FFC107" color="#FFC107" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 flex-grow">{testimonial.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
      
      {/* Ad space below testimonials */}
      <div className="ad-container mt-12 max-w-3xl mx-auto">
        Advertisement Space
      </div>
    </section>
  );
};

export default Testimonials;
