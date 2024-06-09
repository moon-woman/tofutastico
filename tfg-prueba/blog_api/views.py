# from django.shortcuts import render

from rest_framework import generics
from blog.models import Category, Post
from usuarios.models import NewUser
from .serializers import CategorySerializer, PostCreate, PostSerializer, UserPatchSerializer, UserSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly, AllowAny, IsAuthenticated
from rest_framework import viewsets
from rest_framework import filters
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView



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
    


#Vistas de las recetas

class PostList(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Post, slug=item)

    
    def get_queryset(self):
        queryset = Post.objects.all()
        alias_usuario = self.request.query_params.get('alias_usuario')
        if alias_usuario is not None:
            queryset = queryset.filter(author__alias_usuario=alias_usuario)
        return queryset

class PostListDetailfilter(generics.ListAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug', 'title', 'excerpt', 'content', 'ingredients']

class PostSearch(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug', 'title', 'excerpt', 'content', 'ingredients']
    
    
class PostDetail(generics.RetrieveAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        slug = self.request.query_params.get('slug', None)
        print(slug)
        return Post.objects.filter(slug=slug)

#CRUD para el usuario y el superusuario

class CrearPost(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostCreate
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class UsuarioPostDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Post.objects.all()
        else:
            return Post.objects.filter(author__id_usuario=self.request.user.id_usuario)

class EditarPost(generics.UpdateAPIView):
    serializer_class = PostCreate

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Post.objects.all()
        else:
            return Post.objects.filter(author__id_usuario=self.request.user.id_usuario)

class EliminarPost(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Post.objects.all()
        else:
            return Post.objects.filter(author__id_usuario=self.request.user.id_usuario)


#PERFIL DEL USUARIO

class PerfilUsuario(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = 'alias_usuario'
    queryset = NewUser.objects.all()

class EditarPerfil(generics.UpdateAPIView):
    serializer_class = UserPatchSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return NewUser.objects.all()
        else:
            return NewUser.objects.filter(id_usuario=self.request.user.id_usuario)
    
#VISTA PARA LA CATEGORÍA

class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer
    
    queryset = Category.objects.all()
