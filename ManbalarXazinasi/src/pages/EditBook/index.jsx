import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Row,
  Col,
  Progress,
  Spin,
} from "antd";
import {
  InboxOutlined,
  CloseCircleFilled,
  FilePdfFilled,
} from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

export default function EditBook() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("id");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Upload states
  const [imgUploading, setImgUploading] = useState(false);
  const [imgProgress, setImgProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState(""); // Stores the link (old or new)
  const [imgPreview, setImgPreview] = useState(null);

  const [fileUploading, setFileUploading] = useState(false);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState(""); // Stores the link (old or new)
  const API = process.env.REACT_APP_API_URL;

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(`${API}/kategoriya`);
        setCategories(res.data.data || []);
      } catch (err) {
        message.error("Kategoriya olishda xatolik");
      }
    }
    fetchCategories();
  }, []);

  // Fetch book details
  useEffect(() => {
    if (!bookId) {
      setError("Kitob ID topilmadi");
      return;
    }
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/kitoblar/${bookId}`);
        if (res.data.data) {
          form.setFieldsValue(res.data.data);
          setImgUrl(res.data.data.rasm || "");
          setImgPreview(res.data.data.rasm || null);
          setFileUrl(res.data.data.kitob_file || "");
        } else {
          setError("Kitob topilmadi");
        }
      } catch (err) {
        setError("Kitobni olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
    // eslint-disable-next-line
  }, [bookId]);

  // Image upload logic
  const handleImgUpload = async ({ file }) => {
    setImgUploading(true);
    setImgProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
       `${API}/kitoblar/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            setImgProgress(Math.round((e.loaded * 100) / e.total));
          },
        }
      );

      if (res.data?.url) {
        setImgUrl(res.data.url);
        setImgPreview(URL.createObjectURL(file));
        message.success("Rasm yuklandi!");
      } else {
        throw new Error("URL qaytmadi");
      }
    } catch (e) {
      message.error("Rasm yuklashda xatolik!");
    } finally {
      setImgUploading(false);
    }
  };

  // Remove image
  const handleRemoveImg = () => {
    setImgUrl("");
    setImgPreview(null);
    setImgProgress(0);
  };

  // File upload logic
  const handleFileUpload = async ({ file }) => {
    setFileUploading(true);
    setFileProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${API}/kitoblar/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            setFileProgress(Math.round((e.loaded * 100) / e.total));
          },
        }
      );

      if (res.data?.url) {
        setFileUrl(res.data.url);
        message.success("Fayl yuklandi!");
      } else {
        throw new Error("URL qaytmadi");
      }
    } catch (e) {
      message.error("Fayl yuklashda xatolik!");
    } finally {
      setFileUploading(false);
    }
  };

  // Remove file
  const handleRemoveFile = () => {
    setFileUrl("");
    setFileProgress(0);
  };

  // Submit
  const onFinish = async (values) => {
    setSubmitting(true);
    setError(null);

    const payload = {
      ...values,
      rasm: imgUrl || "",
      kitob_file: fileUrl || "",
    };

    try {
      await axios.patch(`${API}/kitoblar/${bookId}`, payload);
      message.success("Kitob muvaffaqiyatli yangilandi!");
      navigate(`/books/${bookId}`);
    } catch (err) {
      setError("Yangilashda xatolik yuz berdi");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin />
      </div>
    );
  if (error)
    return <div className="text-red-600 font-semibold p-6">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-sm text-gray-500 mb-2">
        <Breadcrumb />
      </div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Kitobni tahrirlash
      </h1>
      <div className="mx-auto p-6 bg-white rounded-xl shadow">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Kitob nomi"
                name="nomi"
                rules={[{ required: true, message: "Kitob nomini kiriting" }]}
              >
                <Input placeholder="Kitob nomini kiriting" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Muallif"
                name="muallif"
                rules={[{ required: true, message: "Muallifini kiriting" }]}
              >
                <Input placeholder="Muallif nomini kiriting" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Inventar raqam"
                name="inventar_raqam"
                rules={[
                  { required: true, message: "Inventar raqamini kiriting" },
                ]}
              >
                <Input placeholder="Inventar raqami" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Kategoriyasi"
                name="kategoriya"
                rules={[{ required: true, message: "Kategoriyani tanlang" }]}
              >
                <Select placeholder="Kategoriya tanlang">
                  {categories.map((cat) => (
                    <Option key={cat.id} value={cat.nomi}>
                      {cat.nomi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nashr etilgan yili"
                name="nashr_etilgan_yili"
                rules={[
                  { required: true, message: "Nashr etilgan yilni kiriting" },
                ]}
              >
                <Input placeholder="Nashr etilgan yili" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nashriyot"
                name="nashriyot"
                rules={[{ required: true, message: "Nashriyotni kiriting" }]}
              >
                <Input placeholder="Nashriyot" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tili"
                name="kitob_tili"
                rules={[{ required: true, message: "Kitob tilini kiriting" }]}
              >
                <Input placeholder="Kitob tili" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Soni"
                name="soni"
                rules={[{ required: true, message: "Kitob sonini kiriting" }]}
              >
                <Input type="number" min={1} placeholder="Necha nusxa" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Stilaj"
                name="stilaj"
                rules={[{ required: true, message: "Stilajni kiriting" }]}
              >
                <Input placeholder="Stilaj" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sohasi"
                name="sohasi"
                rules={[{ required: true, message: "Sohasini kiriting" }]}
              >
                <Input placeholder="Sohasi" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Shahar"
                name="shahar"
                rules={[{ required: true, message: "Shaharni kiriting" }]}
              >
                <Input placeholder="Shahar" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Izoh" name="izoh">
                <TextArea placeholder="Izoh" rows={2} />
              </Form.Item>
            </Col>
            {/* Image Upload */}
            <Col span={24}>
              <Form.Item label="Rasm yuklash (ixtiyoriy)">
                {imgUrl && imgPreview ? (
                  <div
                    style={{
                      border: "1px dashed #d9d9d9",
                      borderRadius: 8,
                      padding: 12,
                      textAlign: "center",
                      position: "relative",
                      background: "#fafafa",
                    }}
                  >
                    <img
                      src={imgPreview.startsWith("blob") ? imgPreview : imgUrl}
                      alt="Kitob rasmi"
                      style={{
                        maxWidth: 120,
                        maxHeight: 120,
                        borderRadius: 8,
                        marginBottom: 8,
                        marginTop: 8,
                        objectFit: "cover",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                    <Button
                      icon={
                        <CloseCircleFilled
                          style={{ color: "#ff4d4f", fontSize: 20 }}
                        />
                      }
                      size="small"
                      type="text"
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        zIndex: 10,
                      }}
                      onClick={handleRemoveImg}
                    />
                    <div className="mt-2 text-xs text-green-700">
                      Rasm yuklandi!
                    </div>
                  </div>
                ) : (
                  <Dragger
                    customRequest={handleImgUpload}
                    showUploadList={false}
                    accept="image/*"
                    disabled={imgUploading}
                    style={{ padding: "24px 0", borderRadius: 8 }}
                  >
                    <InboxOutlined
                      style={{
                        color: "#1677ff",
                        fontSize: 40,
                        marginBottom: 12,
                      }}
                    />
                    <p className="ant-upload-text" style={{ marginBottom: 0 }}>
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint" style={{ marginBottom: 0 }}>
                      Support for a single or bulk upload.
                    </p>
                  </Dragger>
                )}
                {imgUploading && (
                  <Progress
                    percent={imgProgress}
                    size="small"
                    className="mt-2"
                  />
                )}
              </Form.Item>
            </Col>
            {/* PDF File Upload */}
            <Col span={24}>
              <Form.Item label="PDF yuklash (ixtiyoriy)">
                {fileUrl ? (
                  <div
                    style={{
                      border: "1px dashed #d9d9d9",
                      borderRadius: 8,
                      padding: 12,
                      textAlign: "center",
                      position: "relative",
                      background: "#fafafa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                    }}
                  >
                    <FilePdfFilled style={{ fontSize: 36, color: "#e74c3c" }} />
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: "bold", color: "#1677ff" }}
                    >
                      Yuklangan PDF
                    </a>
                    <Button
                      icon={
                        <CloseCircleFilled
                          style={{ color: "#ff4d4f", fontSize: 20 }}
                        />
                      }
                      size="small"
                      type="text"
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        zIndex: 10,
                      }}
                      onClick={handleRemoveFile}
                    />
                  </div>
                ) : (
                  <Dragger
                    customRequest={handleFileUpload}
                    showUploadList={false}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    disabled={fileUploading}
                    style={{ padding: "24px 0", borderRadius: 8 }}
                  >
                    <InboxOutlined
                      style={{
                        color: "#1677ff",
                        fontSize: 40,
                        marginBottom: 12,
                      }}
                    />
                    <p className="ant-upload-text" style={{ marginBottom: 0 }}>
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint" style={{ marginBottom: 0 }}>
                      Support for a single or bulk upload.
                    </p>
                  </Dragger>
                )}
                {fileUploading && (
                  <Progress
                    percent={fileProgress}
                    size="small"
                    className="mt-2"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit" loading={submitting}>
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
