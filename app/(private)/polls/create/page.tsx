import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PollForm from '@/components/forms/pollForm';

export default function PollCreatePage() {
  return (
    <Card className="max-w-lg w-full mx-auto">
      <CardHeader>
        <CardTitle>New Poll</CardTitle>
      </CardHeader>
      <CardContent className="w-full px-4">
        <PollForm />
      </CardContent>
    </Card>
  );
}
