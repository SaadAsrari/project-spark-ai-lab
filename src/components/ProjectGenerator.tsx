
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Braces, FileText, Download, Loader2 } from "lucide-react";
import CodeDisplay from './CodeDisplay';

const ProjectGenerator = () => {
  const [projectIdea, setProjectIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<null | {
    abstract: string;
    code: string;
  }>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectIdea.trim()) {
      toast({
        title: "Empty project idea",
        description: "Please describe your project idea before generating.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock response
      setGeneratedContent({
        abstract: `## Face Recognition Attendance System\n\n
### Project Overview\nThis system automates attendance tracking using facial recognition technology. It identifies students in real-time and logs their attendance in a secure database.\n\n
### Key Components\n- **Camera Integration**: Captures real-time video feed for face detection\n- **Face Recognition Model**: Uses a pre-trained convolutional neural network\n- **Database**: Stores student records and attendance logs\n- **User Interface**: Dashboard for administration and reporting\n\n
### Technical Requirements\n- Python with OpenCV and face_recognition libraries\n- Firebase Firestore for attendance records\n- Flask for web server functionality\n- Basic HTML/CSS/JS for the frontend interface`,
        code: `# main.py
import cv2
import face_recognition
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, render_template, Response
import datetime

# Initialize Flask
app = Flask(__name__)

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load known faces
def load_known_faces():
    known_face_encodings = []
    known_face_names = []
    
    # Get student data from Firebase
    students = db.collection('students').get()
    for student in students:
        student_data = student.to_dict()
        encoding = student_data.get('face_encoding')
        if encoding:
            known_face_encodings.append(encoding)
            known_face_names.append(student_data.get('name'))
    
    return known_face_encodings, known_face_names

# Camera feed
def generate_frames():
    known_face_encodings, known_face_names = load_known_faces()
    camera = cv2.VideoCapture(0)
    
    while True:
        success, frame = camera.read()
        if not success:
            break
            
        # Resize frame for faster face recognition
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
        
        # Find faces
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        
        for face_encoding, face_location in zip(face_encodings, face_locations):
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"
            
            if True in matches:
                match_index = matches.index(True)
                name = known_face_names[match_index]
                
                # Log attendance in Firebase
                now = datetime.datetime.now()
                attendance_ref = db.collection('attendance')
                attendance_ref.add({
                    'name': name,
                    'timestamp': now,
                    'date': now.strftime("%Y-%m-%d")
                })
                
            # Draw rectangle around face
            top, right, bottom, left = face_location
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4
            
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)
        
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        
        yield (b'--frame\\r\\n'
               b'Content-Type: image/jpeg\\r\\n\\r\\n' + frame + b'\\r\\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                   mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/attendance')
def attendance():
    # Get today's attendance
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    attendance_data = db.collection('attendance').where('date', '==', today).get()
    
    attendance_list = []
    for doc in attendance_data:
        attendance_list.append(doc.to_dict())
    
    return render_template('attendance.html', attendance_list=attendance_list)

if __name__ == '__main__':
    app.run(debug=True)`
      });
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <section id="generator" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Generate Your Tech Project</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe your project idea in detail, and our AI will generate everything you need to get started.
          </p>
        </div>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="project-idea" className="text-sm font-medium">
                    Describe your project idea
                  </label>
                  <Textarea 
                    id="project-idea"
                    placeholder="E.g., I want to build a face recognition attendance system for my classroom..."
                    className="min-h-[120px]"
                    value={projectIdea}
                    onChange={(e) => setProjectIdea(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating project...
                    </>
                  ) : (
                    'Generate Project'
                  )}
                </Button>
              </div>
            </form>
            
            {generatedContent && (
              <div className="mt-8">
                <Tabs defaultValue="abstract">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="abstract" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Project Abstract
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-2">
                      <Braces className="h-4 w-4" />
                      Source Code
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="abstract" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="prose max-w-none">
                          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: generatedContent.abstract.replace(/\n/g, '<br>') }} />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <CodeDisplay code={generatedContent.code} />
                        <Button className="mt-4 flex gap-2" variant="outline">
                          <Download className="h-4 w-4" />
                          Download Code
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProjectGenerator;
