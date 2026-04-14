type Education = {
  school: string;
  degree: string;
  graduationYear: string;
  gpa: string;
};

const education: Education[] = [
  {
    school: 'Rutgers University',
    degree: 'Computer Science B.S.',
    graduationYear: '2021',
    gpa: '4.0',
  },
];

export default function Education() {
  return (
    <div className="space-y-4">
      {education.map((school, i) => (
        <div key={i} className="bg-gray-900/50 rounded-lg p-4 space-y-1">
          <p className="font-medium">{school.school}</p>
          <p className="text-gray-400">{school.degree}</p>
          <p className="text-sm text-gray-500">
            {school.graduationYear} · {school.gpa} GPA
          </p>
        </div>
      ))}
    </div>
  );
}
