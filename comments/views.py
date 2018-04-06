from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
import psycopg2
from .models import Posts, Users, Comments
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime

def getPosts(request):
     if request.method == 'GET':
        postsList = Posts.objects.all();
        postsList = serializers.serialize("json", postsList)
        return HttpResponse(postsList, content_type="application/json")

def getComments(request):
     if request.method == 'GET':
        parentId = request.GET.get('parentId', None);
        postId = request.GET.get('postId', None);
        print('parent id: ');
        print(parentId);
        print('post id: ');
        print(postId);
        if parentId == '0':
            comments = Comments.objects.filter(post_id = postId).filter(parent_id__isnull=True).only('comment')
        else :
            comments = Comments.objects.filter(post_id = postId).filter(parent_id = parentId).only('comment')
        comments = serializers.serialize("json", comments)
        return HttpResponse(comments, content_type="application/json")

@csrf_exempt
def postReply(request):
    if request.method == 'POST':
        parentId = request.POST.get('parentId', None);
        postId = request.POST.get('postId', None);
        postId = (int) (postId);
        parentId = (int) (parentId);
        reply = request.POST.get('reply', None);
        data = Comments();
        data.comment = reply;
        data.post_id = Posts.objects.get(pk=postId);
        data.parent_id = Comments.objects.get(comment_id = parentId);
        data.likes = 0;
        data.date_created = datetime.now();
        data.date_modified = datetime.now();
        data.user_id = Users.objects.get(pk=3);
        data.save();
        return HttpResponse("success")
