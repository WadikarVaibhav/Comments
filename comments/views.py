from rest_framework import generics
from .models import Posts, Users, Comments
from .serializers import PostSerializer

class PostsList(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer
