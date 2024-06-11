from django.conf import settings
from rest_framework import serializers
from blog.models import Category, Post
from usuarios.models import NewUser
from django.templatetags.static import static


class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ('id', 'name')
        
class CategoryWithRandomPhotoSerializer(serializers.ModelSerializer):
    random_photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'random_photo_url')

    def get_random_photo_url(self, obj):
        posts = Post.objects.filter(category=obj, photo__isnull=False)
        if posts.exists():
            random_post = posts.order_by('?').first()
            return self.context.get("request").build_absolute_uri(random_post.photo.url)
        else:
            default_photo_url = settings.DEFAULT_CATEGORY_PHOTO_URL
            return self.context.get("request").build_absolute_uri(default_photo_url)

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NewUser
        fields = ('id_usuario', 'alias_usuario', 'foto_usuario', 'email', 'nombre', 'apellido_primero', 'apellido_segundo', 'fecha_nacimiento', 'descripcion')
        
class UserPatchSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NewUser
        fields = ('id_usuario', 'nombre', 'apellido_primero', 'apellido_segundo', 'fecha_nacimiento', 'descripcion')

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(required=False)
    author = UserSerializer(required=False , read_only=True)
    slug = serializers.CharField(required=False)
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'author', 'excerpt', 'content', 'ingredients', 'status', 'photo', 'category', 'published')
        
        
class PostCreate(serializers.ModelSerializer):
    author = UserSerializer(required=False , read_only=True)
    slug = serializers.CharField(required=False)
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'author', 'excerpt', 'content', 'ingredients', 'status', 'photo', 'category', 'published')



    
