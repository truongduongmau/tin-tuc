# Sử dụng NGINX làm base image
FROM nginx:alpine

# Copy các tệp đã build vào thư mục gốc của NGINX
COPY docs /usr/share/nginx/html/tin-tuc

# Copy file cấu hình NGINX (tùy chọn)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Lộ cổng 80 để phục vụ ứng dụng
EXPOSE 80

# Chạy NGINX
CMD ["nginx", "-g", "daemon off;"]