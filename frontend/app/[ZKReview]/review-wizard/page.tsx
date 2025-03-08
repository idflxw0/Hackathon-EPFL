'use client';

import { useParams } from 'next/navigation';
import ReviewWizard from '@/components/pages/[ZKReview]/review-wizard';

export default function ReviewWizardPage() {
  const params = useParams();
  const token = params.ZKReview as string;

  return <ReviewWizard initialToken={token} />;
}