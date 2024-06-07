# from django.shortcuts import render

from rest_framework import generics
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from rest_framework import viewsets
from rest_framework import filters
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

# Custom Permissions

class PostUserWritePermission(BasePermission):
    mensaje = 'Solo la persona que creó la receta puede modificarla.'
    
    def has_object_permission(self, request, view, obj):
        
        # method se refiere a HTTP methos, es decir, si alguno de los métodos requeridos son GET, OPTIONS, HEAD podemos ver los datos de la API
        if request.method in SAFE_METHODS:
            return True
        
        # podemos acceder a los datos si el autor del objeto, que sería el post, es el que hace la petición
        return obj.author == request.user
            


# # listar y crear items
# class PostList(generics.ListCreateAPIView):
#     permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
#     queryset = Post.postobjects.all()
#     serializer_class = PostSerializer
  

# # obtener y eliminar items
# class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
#     permission_classes = [PostUserWritePermission]
#     queryset = Post.postobjects.all()
#     serializer_class = PostSerializer


# las distintas clases que hay y qué hacen están en https://www.django-rest-framework.org/api-guide/generic-views/

# class PostList(viewsets.ViewSet):
#     permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
#     queryset = Post.postobjects.all()
    
#     def list(self, request):
#         serializer_class = PostSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)
    
#     def retrieve(self, request, pk=None):
#         post = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = PostSerializer(post)
#         return Response(serializer_class.data)
    
class PostList(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        slug = self.kwargs.get('slug')
        return get_object_or_404(Post, slug=slug)

    # Define Custom Queryset
    def get_queryset(self):
        return Post.objects.all()







