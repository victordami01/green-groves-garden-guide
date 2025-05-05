
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay for better user experience
    setTimeout(() => {
      // In a real application, you would send this data to a server
      console.log('Form submitted:', formData);
      
      // Show success message
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting Green Groves. Our team will get back to you soon.",
        className: "bg-garden-green text-white",
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section id="contact" className="section-container bg-gray-50">
      <h2 className="section-title">Contact Us</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Have questions or need gardening advice? We're here to help! Reach out to our team of garden experts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact form */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4 text-garden-green flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Send us a message
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="focus:ring-garden-green focus:border-garden-green"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="focus:ring-garden-green focus:border-garden-green"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <Textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="focus:ring-garden-green focus:border-garden-green"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-garden-green hover:bg-garden-green/90 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
        
        {/* Google Maps */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4 text-garden-green flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Find Us
          </h3>
          
          <div className="h-[300px] bg-muted rounded-md overflow-hidden shadow-inner">
            {/* Lagos, Nigeria map - Updated for better location */}
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              title="Green Groves Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7212851011897!2d3.3791924746608807!3d6.429433024186722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2a82b9056d%3A0x2a376b13cc0e4402!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1713390158801!5m2!1sen!2sng"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            ></iframe>
          </div>
          
          <div className="mt-4 space-y-3 text-gray-700">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-garden-green mr-2 mt-1 flex-shrink-0" />
              <p><strong>Address:</strong> 15 Adeola Odeku Street, Victoria Island, Lagos, Nigeria</p>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-garden-green mr-2 flex-shrink-0" />
              <p><strong>Email:</strong> hello@greengroves.com.ng</p>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-garden-green mr-2 flex-shrink-0" />
              <p><strong>Phone:</strong> +234 803 456 7890</p>
            </div>
            
            <div className="pt-3 mt-3 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                <strong>Operating Hours:</strong><br />
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
