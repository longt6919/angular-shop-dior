import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsertProductDTO } from 'src/app/dtos/product/insert.product.dto';
import { Brand } from 'src/app/models/brand';
import { Category } from 'src/app/models/category';
import { Material } from 'src/app/models/material';
import { Origin } from 'src/app/models/origin';
import { Style } from 'src/app/models/style';
import { BrandService } from 'src/app/service/brand.service';
import { CategoryService } from 'src/app/service/category.service';
import { MaterialService } from 'src/app/service/material.service';
import { OriginService } from 'src/app/service/origin.service';
import { ProductService } from 'src/app/service/product.service';
import { StyleService } from 'src/app/service/style.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-insert.product.admin',
  templateUrl: './insert.product.admin.component.html',
  styleUrls: ['./insert.product.admin.component.scss']
})
export class InsertProductAdminComponent implements OnInit {
   insertProductDTO: InsertProductDTO = {
     name: '',
     price: 0,
     description: '',
     category_id: 0,
     image: [],
     brand_id: 0,
     material_id: 0,
     style_id: 0,
     origin_id: 0,
     id: 0
   };
  categories: Category[] = [];
  brands: Brand[]=[];
  materials: Material[]=[];
  styles: Style[]=[];
  origins: Origin[]=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastService: ToastService,
    private brandService: BrandService,
    private materialService: MaterialService,
    private styleService: StyleService,
    private originService: OriginService
  ) { }

  ngOnInit(): void {
    this.getCategories(1, 100);
this.getBrands(1,100);
this.getMaterials(1,100);
this.getStyles(1,100);
this.getOrigins(1,100);
  }
    getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      complete: () => {},
      error: (error: any) => {
        console.log('Error fetching categories', error);
      },
    });
  }
      getBrands(page: number, limit: number) {
    this.brandService.getBrands(page, limit).subscribe({
      next: (brands: Brand[]) => {
        this.brands = brands;
      },
      complete: () => {},
      error: (error: any) => {
        console.log('Error fetching brands', error);
      },
    });
  }
        getMaterials(page: number, limit: number) {
    this.materialService.getMaterials(page, limit).subscribe({
      next: (materials: Material[]) => {
        this.materials = materials;
      },
      complete: () => {},
      error: (error: any) => {
        console.log('Error fetching material', error);
      },
    });
  }
      getStyles(page: number, limit: number) {
    this.styleService.getStyles(page, limit).subscribe({
      next: (styles: Style[]) => {
        this.styles = styles;
      },
      complete: () => {},
      error: (error: any) => {
        console.log('Error fetching style', error);
      },
    });
  }
      getOrigins(page: number, limit: number) {
    this.originService.getOrigins(page, limit).subscribe({
      next: (origins: Origin[]) => {
        this.origins = origins;
      },
      complete: () => {},
      error: (error: any) => {
        console.log('Error fetching origins', error);
      },
    });
  }
  onFileChange(event: any) {
    const files = event.target.files;
    // Limit the number of selected files to 5
    if (files.length > 5) {
      alert('Please select a maximum of 5 images.');
      return;
    }
    this.insertProductDTO.image = files;
  }
  insertProduct() {
    this.productService.insertProduct(this.insertProductDTO).subscribe({
      next: (response) => {
        console.log('Insert product response:', response);
        const productId = response.data?.id;
        if (
          this.insertProductDTO.image &&
          this.insertProductDTO.image.length > 0
        ) {
          const formData = new FormData();
          for (const file of this.insertProductDTO.image) {
            formData.append('files', file);
          }

          this.productService.uploadImage(productId, formData).subscribe({
            next: (imageResponse) => {
              console.log('Images upload successfully:', imageResponse);
              this.toastService.showToast({
                error: null,
                defaultMsg: 'Thêm sản phẩm thành công',
                title: 'Thành Công',
              });
              this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: (error) => {
              this.toastService.showToast({
                error: error,
                defaultMsg: 'Lỗi khi tải ảnh sản phẩm',
                title: 'Lỗi Upload Ảnh',
              });
              console.error('Error uploading images:', error);
            },
          });
        } else {
          this.toastService.showToast({
            error: null,
            defaultMsg: 'Thêm sản phẩm thành công',
            title: 'Thành Công',
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      },
      error: (error) => {
        this.toastService.showToast({
          error: error,
          defaultMsg: 'Lỗi khi thêm sản phẩm',
          title: 'Lỗi Thêm',
        });
        console.error('Error inserting product:', error);
      },
    });
  }

}
