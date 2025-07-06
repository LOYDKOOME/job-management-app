from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.filter(status='active')
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(status='active')

    @action(detail=True, methods=['patch'])
    def deactivate(self, request, pk=None):
        job = self.get_object()
        job.status = 'inactive'
        job.save()
        return Response({'status': 'job deactivated'})

    def get_queryset(self):
        queryset = Job.objects.filter(status="active")
        title = self.request.query_params.get('title', None)
        company = self.request.query_params.get('company', None)
        location = self.request.query_params.get('location', None)

        if title:
            queryset = queryset.filter(title__icontains=title)
        if company:
            queryset = queryset.filter(company_name__icontains=company)
        if location:
            queryset = queryset.filter(location__icontains=location)

        return queryset