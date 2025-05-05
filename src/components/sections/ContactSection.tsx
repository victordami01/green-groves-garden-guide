
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting Green Groves. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-container">
      <h2 className="section-title">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-garden-green">Send us a message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-garden-green hover:bg-garden-green/90"
            >
              Send Message
            </Button>
          </form>
        </div>
        
        {/* Google Maps */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-garden-green">Find Us</h3>
          
          <div className="h-[300px] bg-muted rounded-md overflow-hidden">
            {/* Lagos, Nigeria map */}
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              title="Green Groves Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7300224441096!2d3.370861214262226!3d6.4279319259189585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2a9178c143%3A0x6b415bbf32be4c4e!2sLagos%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1713390158801!5m2!1sen!2sng"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          <div className="mt-4 space-y-2">
            <p><strong>Address:</strong> 123 Herbert Macaulay Way, Yaba, Lagos, Nigeria</p>
            <p><strong>Email:</strong> contact@greengroves.com</p>
            <p><strong>Phone:</strong> +234 801 234 5678</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
